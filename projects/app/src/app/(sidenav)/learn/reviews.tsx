import { QuizDeck } from "@/client/ui/QuizDeck";
import { RectButton2 } from "@/client/ui/RectButton2";
import { useQueryOnce, useReplicache } from "@/client/ui/ReplicacheContext";
import { generateQuestionForSkillOrThrow } from "@/data/generator";
import { questionsForReview } from "@/data/query";
import { formatDuration } from "date-fns/formatDuration";
import { interval } from "date-fns/interval";
import { intervalToDuration } from "date-fns/intervalToDuration";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTimeout } from "usehooks-ts";

export default function ReviewsPage() {
  const r = useReplicache();

  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  useTimeout(show, 2000);

  const questions = useQueryOnce(async (tx) => {
    const result = await questionsForReview(r, tx, {
      limit: 10,
      dueBeforeNow: true,
      // Look ahead at the next 50 skills, shuffle them and take 10. This way
      // you don't end up with the same set over and over again (which happens a
      // lot in development).
      sampleSize: 50,
    });

    return result.map(([, , question]) => question);
  });

  const nextNotYetDueSkillState = useQueryOnce(async (tx) => {
    const now = new Date();
    for await (const [{ skill }, skillState] of r.query.skillState.byDue(tx)) {
      if (skillState.due <= now) {
        continue;
      }

      try {
        await generateQuestionForSkillOrThrow(skill);
      } catch {
        continue;
      }

      return skillState;
    }
  });

  return (
    <View className="flex-1 items-center bg-background pt-safe-offset-[20px]">
      {questions.loading || !visible ? (
        <Animated.View entering={FadeIn} className="my-auto">
          <Text className="text-text">Loading…</Text>
        </Animated.View>
      ) : questions.error ? (
        <Text className="text-text">Oops something broken</Text>
      ) : questions.data.length > 0 ? (
        <QuizDeck questions={questions.data} className="h-full w-full" />
      ) : (
        <View
          style={{
            flex: 1,
            gap: 16,
            alignItems: `center`,
            justifyContent: `center`,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Text style={{ color: `white`, fontSize: 30, textAlign: `center` }}>
            👏 You’re all caught up on your reviews!
          </Text>
          <GoHomeButton />
          {nextNotYetDueSkillState.loading ||
          nextNotYetDueSkillState.data === undefined ? null : (
            <Text style={{ color: `#AAA`, textAlign: `center` }}>
              Next review in{` `}
              {formatDuration(
                intervalToDuration(
                  interval(new Date(), nextNotYetDueSkillState.data.due),
                ),
              )}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const GoHomeButton = () => (
  <View style={{ height: 44 }}>
    <Link dismissTo href="/learn" asChild>
      <RectButton2 textClassName="font-bold text-text text-xl">
        Back
      </RectButton2>
    </Link>
  </View>
);

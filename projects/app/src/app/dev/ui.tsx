import { AnswerButton, AnswerButtonState } from "@/components/AnswerButton";
import { RectButton2 } from "@/components/RectButton2";
import { PropsOf } from "@/components/types";
import { Link } from "expo-router";
import shuffle from "lodash/shuffle";
import { ReactNode, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tv } from "tailwind-variants";

export default function DesignSystemPage() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View className="flex-row p-2">
        <Link href="/" asChild>
          <Text className="text-text hover:underline">Home</Text>
        </Link>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <Section title="AnswerButton">
          <AnswerButtonExamples />
        </Section>

        <Section title="RectButton2">
          <RectButton2Examples />
        </Section>

        <Section title="Typography">
          <View className="flex-1 gap-2">
            {([`body`, `title`, `chinese`] as const).map((family) => (
              <View key={family}>
                <LittlePrimaryHeader title={family} />
                <TypographyExample family={family} size="xs" />
                <TypographyExample family={family} size="sm" />
                <TypographyExample family={family} size="base" />
                <TypographyExample family={family} size="lg" />
                <TypographyExample family={family} size="xl" />
                <TypographyExample family={family} size="2xl" />
              </View>
            ))}
          </View>
        </Section>

        <Section title="Colors">
          <View>
            <LittlePrimaryHeader title="slate" />
            <View className="flex-row flex-wrap gap-1">
              <ColorSwatch className="bg-slate-1" index={1} />
              <ColorSwatch className="bg-slate-2" index={2} />
              <ColorSwatch className="bg-slate-3" index={3} />
              <ColorSwatch className="bg-slate-4" index={4} />
              <ColorSwatch className="bg-slate-5" index={5} />
              <ColorSwatch className="bg-slate-6" index={6} />
              <ColorSwatch className="bg-slate-7" index={7} />
              <ColorSwatch className="bg-slate-8" index={8} />
              <ColorSwatch className="bg-slate-9" index={9} />
              <ColorSwatch className="bg-slate-10" index={10} />
              <ColorSwatch className="bg-slate-11" index={11} />
              <ColorSwatch className="bg-slate-12" index={12} />
            </View>
          </View>

          <View>
            <LittlePrimaryHeader title="cyan" />
            <View className="flex-row flex-wrap gap-1">
              <ColorSwatch className="bg-cyan-1" index={1} />
              <ColorSwatch className="bg-cyan-2" index={2} />
              <ColorSwatch className="bg-cyan-3" index={3} />
              <ColorSwatch className="bg-cyan-4" index={4} />
              <ColorSwatch className="bg-cyan-5" index={5} />
              <ColorSwatch className="bg-cyan-6" index={6} />
              <ColorSwatch className="bg-cyan-7" index={7} />
              <ColorSwatch className="bg-cyan-8" index={8} />
              <ColorSwatch className="bg-cyan-9" index={9} />
              <ColorSwatch className="bg-cyan-10" index={10} />
              <ColorSwatch className="bg-cyan-11" index={11} />
              <ColorSwatch className="bg-cyan-12" index={12} />
            </View>
          </View>
          <View>
            <LittlePrimaryHeader title="red" />
            <View className="flex-row flex-wrap gap-1">
              <ColorSwatch className="bg-red-1" index={1} />
              <ColorSwatch className="bg-red-2" index={2} />
              <ColorSwatch className="bg-red-3" index={3} />
              <ColorSwatch className="bg-red-4" index={4} />
              <ColorSwatch className="bg-red-5" index={5} />
              <ColorSwatch className="bg-red-6" index={6} />
              <ColorSwatch className="bg-red-7" index={7} />
              <ColorSwatch className="bg-red-8" index={8} />
              <ColorSwatch className="bg-red-9" index={9} />
              <ColorSwatch className="bg-red-10" index={10} />
              <ColorSwatch className="bg-red-11" index={11} />
              <ColorSwatch className="bg-red-12" index={12} />
            </View>
          </View>
          <View>
            <LittlePrimaryHeader title="lime" />
            <View className="flex-row flex-wrap gap-1">
              <ColorSwatch className="bg-lime-1" index={1} />
              <ColorSwatch className="bg-lime-2" index={2} />
              <ColorSwatch className="bg-lime-3" index={3} />
              <ColorSwatch className="bg-lime-4" index={4} />
              <ColorSwatch className="bg-lime-5" index={5} />
              <ColorSwatch className="bg-lime-6" index={6} />
              <ColorSwatch className="bg-lime-7" index={7} />
              <ColorSwatch className="bg-lime-8" index={8} />
              <ColorSwatch className="bg-lime-9" index={9} />
              <ColorSwatch className="bg-lime-10" index={10} />
              <ColorSwatch className="bg-lime-11" index={11} />
              <ColorSwatch className="bg-lime-12" index={12} />
            </View>
          </View>
        </Section>

        {/* Fill the rest of the page if it's too tall for the content */}
        <View className="flex-1 flex-row">
          <View className={`light-theme ${examplesStackClassName}`} />
          <View className={`dark-theme ${examplesStackClassName}`} />
        </View>
      </ScrollView>
    </View>
  );
}

const typography = tv({
  base: `text-primary-12`,

  variants: {
    size: {
      xs: `text-xs`,
      sm: `text-sm`,
      base: `text-base`,
      lg: `text-lg`,
      xl: `text-xl`,
      "2xl": `text-2xl`,
    },
    family: {
      body: `font-body`,
      title: `font-title`,
      chinese: `font-chinese`,
    },
  },
});

const TypographyExample = ({
  size,
  family,
}: {
  size: `xs` | `sm` | `base` | `lg` | `xl` | `2xl`;
  family: `body` | `title` | `chinese`;
}) => {
  return (
    <View>
      <Text className="font-xs text-primary-9">
        <Text className="text-xs font-bold text-primary-11">{size}</Text>
      </Text>

      <Text className={typography({ size, family })} numberOfLines={1}>
        The quick brown fox jumps over the lazy dog.
      </Text>
    </View>
  );
};

const LittlePrimaryHeader = ({ title }: { title: string }) => {
  return (
    <View className="mb-2 mt-4 flex-row items-center gap-2">
      <View className="h-[1px] flex-grow bg-primary-7" />
      <Text className="text-center text-xs font-bold uppercase text-primary-10">
        {title}
      </Text>
      <View className="h-[1px] flex-grow bg-primary-7" />
    </View>
  );
};

const captionLabel = tv({
  base: `text-primary-9 text-xs text-center`,
  variants: {
    highlighted: {
      true: `text-primary-11 font-bold`,
    },
  },
});

const ColorSwatch = ({
  index,
  className,
}: {
  index: number;
  className?: string;
}) => (
  <View className="flex-wrap gap-1">
    <Text className={captionLabel({ highlighted: index === 10 })}>{index}</Text>
    <View className={`h-[40px] w-[40px] ${className ?? ``}`} />
  </View>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <>
    <View className="flex-row">
      <View className="light-theme flex-1 bg-primary-4 p-2">
        <Text className="text-2xl">{title}</Text>
      </View>
      <View className="dark-theme flex-1 bg-primary-4 p-2" />
    </View>
    <View className="flex-row">
      <View className={`light-theme ${examplesStackClassName}`}>
        {children}
      </View>
      <View className={`dark-theme ${examplesStackClassName}`}>{children}</View>
    </View>
  </>
);

const examplesStackClassName = `bg-background flex-1 shrink basis-1 flex-row flex-wrap justify-center gap-2 p-2 sm:justify-start`;

const ExampleStack = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => (
  <View className="items-center gap-2 p-2">
    <Text className="text-center text-xs text-primary-10">{title}</Text>
    {children}
  </View>
);

const RectButton2Variants = (props: Partial<PropsOf<typeof RectButton2>>) => (
  <>
    <RectButton2 variant="bare" {...props}>
      Bare
    </RectButton2>
    <RectButton2 variant="outline" {...props}>
      Outline
    </RectButton2>
    <RectButton2 variant="filled" {...props}>
      Filled
    </RectButton2>
  </>
);

const RectButton2Examples = (props: Partial<PropsOf<typeof RectButton2>>) => (
  <View className="flex-1">
    <View className="flex-row flex-wrap">
      <ExampleStack title="normal">
        <RectButton2Variants {...props} />
      </ExampleStack>

      <ExampleStack title="normal (disabled)">
        <RectButton2Variants disabled {...props} />
      </ExampleStack>
    </View>

    <LittlePrimaryHeader title="accent" />

    <View className="flex-row flex-wrap">
      <ExampleStack title="normal">
        <RectButton2Variants accent {...props} />
      </ExampleStack>

      <View className="success-theme">
        <ExampleStack title="success">
          <RectButton2Variants accent {...props} />
        </ExampleStack>
      </View>

      <View className="danger-theme">
        <ExampleStack title="danger">
          <RectButton2Variants accent {...props} />
        </ExampleStack>
      </View>

      <ExampleStack title="(disabled)">
        <RectButton2Variants accent disabled {...props} />
      </ExampleStack>
    </View>

    <LittlePrimaryHeader title="flex-col" />

    <View className="flex-row flex-wrap">
      <ExampleStack title="items-start">
        <View className="w-[120px] flex-col items-start gap-2 border-2 border-dashed border-primary-8">
          <RectButton2Variants {...props} />
        </View>
      </ExampleStack>

      <ExampleStack title="items-center">
        <View className="w-[120px] flex-col items-center gap-2 border-2 border-dashed border-primary-8">
          <RectButton2Variants {...props} />
        </View>
      </ExampleStack>

      <ExampleStack title="items-stretch">
        <View className="w-[120px] flex-col items-stretch gap-2 border-2 border-dashed border-primary-8">
          <RectButton2Variants {...props} />
        </View>
      </ExampleStack>

      <ExampleStack title="items-end">
        <View className="w-[120px] flex-col items-end gap-2 border-2 border-dashed border-primary-8">
          <RectButton2Variants {...props} />
        </View>
      </ExampleStack>
    </View>

    <LittlePrimaryHeader title="flex-row" />

    <View className="flex-row flex-wrap">
      <ExampleStack title="items-start">
        <View className="h-[100px] flex-row items-start gap-2 border-2 border-dashed border-primary-8">
          <RectButton2Variants {...props} />
        </View>
      </ExampleStack>

      <ExampleStack title="items-center">
        <View className="h-[100px] flex-row items-center gap-2 border-2 border-dashed border-primary-8">
          <RectButton2Variants {...props} />
        </View>
      </ExampleStack>

      <ExampleStack title="items-stretch">
        <View className="h-[100px] flex-row items-stretch gap-2 border-2 border-dashed border-primary-8">
          <RectButton2Variants {...props} />
        </View>
      </ExampleStack>

      <ExampleStack title="items-end">
        <View className="h-[100px] flex-row items-end gap-2 border-2 border-dashed border-primary-8">
          <RectButton2Variants {...props} />
        </View>
      </ExampleStack>
    </View>
  </View>
);

const AnswerButtonExamples = (props: Partial<PropsOf<typeof AnswerButton>>) => (
  <View className="flex-1">
    <View className="flex-row flex-wrap">
      <ExampleStack title="state">
        <AnswerButton state="default" {...props}>
          default
        </AnswerButton>
        <AnswerButton state="error" {...props}>
          error
        </AnswerButton>
        <AnswerButton state="selected" {...props}>
          selected
        </AnswerButton>
        <AnswerButton state="success" {...props}>
          success
        </AnswerButton>
      </ExampleStack>

      <ExampleStack title="disabled">
        <AnswerButton disabled {...props}>
          Disabled
        </AnswerButton>
      </ExampleStack>

      <ExampleStack title="synced">
        <SyncedAnswerButtonExample />
      </ExampleStack>
    </View>

    <LittlePrimaryHeader title="flex-col" />

    <View className="flex-row flex-wrap">
      <ExampleStack title="items-start">
        <View className="h-[120px] w-[120px] items-start gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample />
        </View>
      </ExampleStack>

      <ExampleStack title="items-center">
        <View className="h-[120px] w-[120px] items-center gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample />
        </View>
      </ExampleStack>

      <ExampleStack title="items-stretch">
        <View className="h-[120px] w-[120px] gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample />
        </View>
      </ExampleStack>

      <ExampleStack title="items-end">
        <View className="h-[120px] w-[120px] items-end gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample />
        </View>
      </ExampleStack>
    </View>

    <LittlePrimaryHeader title="flex-col + flex-1" />

    <View className="flex-row flex-wrap">
      <ExampleStack title="items-start">
        <View className="h-[120px] w-[120px] items-start gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample className="flex-1" />
        </View>
      </ExampleStack>

      <ExampleStack title="items-center">
        <View className="h-[120px] w-[120px] items-center gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample className="flex-1" />
        </View>
      </ExampleStack>

      <ExampleStack title="items-stretch">
        <View className="h-[120px] w-[120px] gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample className="flex-1" />
        </View>
      </ExampleStack>

      <ExampleStack title="items-end">
        <View className="h-[120px] w-[120px] items-end gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample className="flex-1" />
        </View>
      </ExampleStack>
    </View>

    <LittlePrimaryHeader title="flex-row" />

    <View className="flex-row flex-wrap">
      <ExampleStack title="items-start">
        <View className="h-[100px] w-[200px] flex-row items-start gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample />
        </View>
      </ExampleStack>

      <ExampleStack title="items-center">
        <View className="h-[100px] w-[200px] flex-row items-center gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample />
        </View>
      </ExampleStack>

      <ExampleStack title="items-stretch">
        <View className="h-[100px] w-[200px] flex-row gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample />
        </View>
      </ExampleStack>

      <ExampleStack title="items-end">
        <View className="h-[100px] w-[200px] flex-row items-end gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample />
        </View>
      </ExampleStack>
    </View>

    <LittlePrimaryHeader title="flex-row + flex-1" />

    <View className="flex-row flex-wrap">
      <ExampleStack title="items-start">
        <View className="h-[100px] w-[200px] flex-row items-start gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample className="flex-1" />
        </View>
      </ExampleStack>

      <ExampleStack title="items-center">
        <View className="h-[100px] w-[200px] flex-row items-center gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample className="flex-1" />
        </View>
      </ExampleStack>

      <ExampleStack title="items-stretch">
        <View className="h-[100px] w-[200px] flex-row gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample className="flex-1" />
        </View>
      </ExampleStack>

      <ExampleStack title="items-end">
        <View className="h-[100px] w-[200px] flex-row items-end gap-2 border-2 border-dashed border-primary-8">
          <SyncedAnswerButtonExample className="flex-1" />
        </View>
      </ExampleStack>
    </View>
  </View>
);

function SyncedAnswerButtonExample(props: PropsOf<typeof AnswerButton>) {
  const [state, setState] = useState<AnswerButtonState>(`default`);
  return (
    <>
      <AnswerButton
        state={state}
        onPress={() => {
          setState(
            (prev) =>
              shuffle(
                (
                  [
                    `selected`,
                    `success`,
                    `error`,
                    `default`,
                  ] as AnswerButtonState[]
                ).filter((x) => x !== prev),
              )[0] ?? `default`,
          );
        }}
        {...props}
      >
        Primary
      </AnswerButton>
      <AnswerButton state={state} {...props}>
        Mirror
      </AnswerButton>
    </>
  );
}

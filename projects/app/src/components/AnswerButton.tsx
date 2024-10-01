import { Theme, View } from "@tamagui/core";
import { SizableText } from "@tamagui/text";
import { ElementRef, forwardRef, useEffect, useState } from "react";
import { Pressable, ViewProps } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withClamp,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { PropsOf } from "./types";
import { hapticImpactIfMobile } from "./util";

export type ButtonSize = `$1` | `$2`;

export type AnswerButtonState = `default` | `selected` | `success` | `error`;

export type AnswerButtonProps = {
  thickness?: number;
  size?: ButtonSize;
  children?: ViewProps[`children`];
  state?: AnswerButtonState;
} & Omit<PropsOf<typeof Pressable>, `children`>;

export const AnswerButton = forwardRef<
  ElementRef<typeof Pressable>,
  AnswerButtonProps
>(function AnswerButton(
  {
    disabled = false,
    thickness = 4,
    children,
    state = `default`,
    size = `$1`,
    ...pressableProps
  },
  ref,
) {
  // const [state, setState] = useState<AnswerButtonState>(`default`);
  const [prevState, setPrevState] = useState(state);

  const scale = useSharedValue(1);
  const bgScale = useSharedValue(0.5);
  const bgOpacity = useSharedValue(0);

  const animationFactor = 1;

  useEffect(() => {
    setPrevState(state);
  }, [state]);

  const stateChanged = state !== prevState;

  const withScaleAnimation = () =>
    withSequence(
      withTiming(0.5, { duration: 0 }),
      withTiming(1.07, {
        duration: 200 * animationFactor,
        easing: Easing.inOut(Easing.quad),
      }),
      withTiming(1, {
        duration: 100 * animationFactor,
        easing: Easing.out(Easing.quad),
      }),
    );

  useEffect(() => {
    if (stateChanged) {
      switch (state) {
        case `default`:
          setBgFilled(false);
          bgScale.value = 0.5;
          bgOpacity.value = 0;
          break;
        case `selected`: {
          scale.value = withClamp({ min: 1 }, withScaleAnimation());
          bgScale.value = withClamp({ max: 1 }, withScaleAnimation());
          bgOpacity.value = withTiming(1, { duration: 100 * animationFactor });
          break;
        }
        case `error`: {
          scale.value = withClamp({ min: 1 }, withScaleAnimation());
          bgScale.value = withClamp({ max: 1 }, withScaleAnimation());
          bgOpacity.value = withTiming(1, { duration: 100 * animationFactor });
          break;
        }
        case `success`: {
          scale.value = withClamp({ min: scale.value }, withScaleAnimation());
          bgScale.value = withClamp(
            { min: bgScale.value, max: 1 },
            withScaleAnimation(),
          );
          bgOpacity.value = withClamp(
            { min: bgOpacity.value },
            withTiming(1, { duration: 100 * animationFactor }),
          );
          break;
        }
      }
    }
  }, [bgOpacity, bgScale, scale, stateChanged, state]);

  const [bgFilled, setBgFilled] = useState(false);

  // When the background scale reaches 100% update `bgFilled` to make the border
  // bright.
  useAnimatedReaction(
    () => bgScale.value,
    (currentValue, previousValue) => {
      if (currentValue < 1 && (previousValue === null || previousValue >= 1)) {
        runOnJS(setBgFilled)(false);
      } else if (
        currentValue >= 1 &&
        (previousValue === null || previousValue < 1)
      ) {
        runOnJS(setBgFilled)(true);
      }
    },
    [bgScale.value],
  );

  const borderWidth = 2;

  // The border contributes to the same *thickness* appearance, so to avoid
  // doubling up, we subtract it.
  thickness = thickness - borderWidth;

  const [pressed, setPressed] = useState(false);
  const flat = pressed || disabled;

  return (
    <Theme
      name={
        state === `default` || state === `selected`
          ? undefined
          : state === `success`
            ? `success`
            : `danger`
      }
    >
      <Pressable
        {...pressableProps}
        disabled={disabled}
        onPressIn={(e) => {
          setPressed(true);
          hapticImpactIfMobile();
          pressableProps.onPressIn?.(e);
        }}
        onPressOut={(e) => {
          setPressed(false);
          pressableProps.onPressOut?.(e);
        }}
        onPress={(e) => {
          pressableProps.onPress?.(e);
        }}
        ref={ref}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <View
            borderWidth={borderWidth}
            borderBottomWidth={borderWidth + (flat ? 0 : thickness)}
            borderColor={
              state !== `default` && bgFilled ? `$accent9` : `$borderColor`
            }
            borderRadius={size === `$1` ? `$3` : `$4`}
            marginTop={flat ? thickness : 0}
            paddingTop="$1"
            paddingBottom="$1"
            paddingLeft="$3"
            paddingRight="$3"
            flexGrow={1}
            flexShrink={1}
            alignItems="center"
            justifyContent="center"
            transformOrigin="center"
            opacity={disabled ? 0.5 : undefined}
          >
            <Animated.View
              style={{
                position: `absolute`,
                // HACK: fixes border radius on the parent from looking wonky
                top: 0.5,
                left: 0.5,
                right: 0.5,
                bottom: 0.5,
                zIndex: -1,
                opacity: bgOpacity,
                transform: [{ scale: bgScale }],
              }}
            >
              <View
                backgroundColor="$accent4"
                borderRadius="$2"
                style={{
                  position: `absolute`,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            </Animated.View>
            <SizableText
              size="$3"
              textTransform="uppercase"
              userSelect="none"
              fontWeight="bold"
              color={state !== `default` ? `$accent9` : `$color`}
            >
              {children}
            </SizableText>
          </View>
        </Animated.View>
      </Pressable>
    </Theme>
  );
});

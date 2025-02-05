import LottieView from "lottie-react-native";
import { useState } from "react";
import { View, ViewProps } from "react-native";

export const ShootingStar = ({ className }: Pick<ViewProps, `className`>) => {
  const [hide, setHide] = useState(false);

  return (
    <View className={`h-[40px] w-[40px] ${className ?? ``}`}>
      {hide ? null : (
        <LottieView
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            setHide(true);
          }}
          style={{
            width: `100%`,
            height: `100%`,
            alignSelf: `center`,
            justifyContent: `center`,
          }}
          source={require(`@/assets/lottie/shooting-star-2.lottie.json`)}
        />
      )}
    </View>
  );
};

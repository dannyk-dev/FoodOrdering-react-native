import Colors from "@/src/constants/Colors";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import { Product } from "../types";
import { Href, HrefObject, Link, LinkProps, useSegments } from "expo-router";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Product;
};

type Segment<T> = T extends
  | Href<T | string>
  | HrefObject<Record<string, string>>
  ? T
  : never;

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();
  const path: Segment<Href<string>> = `/${segments[0] || ""}/menu/${
    product.id
  }` as `${string}:${string}`;

  return (
    <Link href={path as `${string}:${string}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
    // margin: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    color: Colors.light.tint,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

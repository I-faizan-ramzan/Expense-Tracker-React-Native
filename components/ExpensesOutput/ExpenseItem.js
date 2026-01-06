import { View, StyleSheet, Text, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { getFormatedDate } from "../../utill/date";
import { useNavigation } from "@react-navigation/native";

export default function ExpensesItem({ id, description, amount, date }) {
  const navigation = useNavigation();
  function expensePressHanlder() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  }
  return (
    <>
      <Pressable
        onPress={expensePressHanlder}
        style={({ pressed }) => pressed && styles.pressed}
        android_ripple={{ elevation: 4 }}
      >
        <View style={styles.expenseItem}>
          <View>
            <Text style={[styles.description, styles.textBase]}>
              {description}
            </Text>
            <Text style={styles.textBase}>{getFormatedDate(date)}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{amount.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    justifyContent: "space-between",
    borderRadius: 6,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});

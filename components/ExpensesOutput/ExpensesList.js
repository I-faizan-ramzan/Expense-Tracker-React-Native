import { StyleSheet, FlatList } from "react-native";
import ExpensesItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpensesItem {...itemData.item} />;
}

export default function ExpensesList({ expenses }) {
  return (
    <>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyEx
        tractor={(item) => item.id}
      />
    </>
  );
}

const styles = StyleSheet.create({});

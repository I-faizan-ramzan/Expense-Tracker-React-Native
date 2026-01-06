import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import Button from "../components/UI/Button";

export default function ManageExpense({ route, navigation }) {
  const editedExpenceId = route.params?.expenseId;
  const isEditing = !!editedExpenceId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  function deleteExpenseHandler() {
    console.log("deleted");
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHanler() {
    navigation.goBack();
    if (isEditing) {
      console.log("updated");
    } else {
      console.log("added");
    }
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button mode="flat" onPress={cancelHandler}>
            Cancel
          </Button>
          <Button onPress={confirmHanler}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </View>
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

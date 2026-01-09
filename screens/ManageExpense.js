import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpence, updateExpense } from "../utill/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpense({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  const editedExpenceId = route.params?.expenseId;
  const isEditing = !!editedExpenceId;
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenceId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  async function deleteExpenseHandler() {
    setIsFetching(true);
    try {
      await deleteExpense(editedExpenceId);
      console.log("Deleting ID:", editedExpenceId);
      expensesCtx.deleteExpense(editedExpenceId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense -Please tey again later");
      setIsFetching(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHanler(expenseData) {
    setIsFetching(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenceId, expenseData);
        await updateExpense(editedExpenceId, expenseData);
      } else {
        const id = await storeExpence(expenseData);

        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
      setIsFetching(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <View style={styles.container}>
        <ExpenseForm
          onCancel={cancelHandler}
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onSubmit={confirmHanler}
          defaultValues={isEditing ? selectedExpense : ""}
        />

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
});

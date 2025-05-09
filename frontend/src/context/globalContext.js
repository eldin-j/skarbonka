import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5000/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    // Format money with spaces
    const formatMoney = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        const sortedIncomes = response.data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        setIncomes(sortedIncomes)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return formatMoney(totalIncome);
    }


    //calculate expenses
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        const sortedExpenses = response.data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        setExpenses(sortedExpenses)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return formatMoney(totalIncome);
    }


    const totalBalance = () => {
        // Parse the formatted strings back to numbers for calculation
        const income = parseFloat(totalIncome().replace(/\s/g, ''));
        const expense = parseFloat(totalExpenses().replace(/\s/g, ''));
        return formatMoney(income - expense);
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    const getMostFrequentCategory = (transactions) => {
        const categories = {};
        transactions.forEach(t => {
            categories[t.category] = (categories[t.category] || 0) + 1;
        });
        return Object.entries(categories).sort((a, b) => b[1] - a[1])[0][0];
    };


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            getMostFrequentCategory,
            error,
            setError,
            formatMoney
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
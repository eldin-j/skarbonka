import {Statistics, expenses, transactions, trend} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Statistics',
        icon: Statistics,
        link: '/Statistics'
    },
    {
        id: 2,
        title: "Transactions",
        icon: transactions,
        link: "/Statistics",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/Statistics",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/Statistics",
    },
]
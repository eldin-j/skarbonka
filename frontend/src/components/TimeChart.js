import React from 'react'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext'
import { dateFormat } from '../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function TimeChart() {
    const {incomes, expenses} = useGlobalContext()

    // Combine all transactions for sorting by date
    const allTransactions = [
        ...incomes.map(inc => ({...inc, type: 'income'})),
        ...expenses.map(exp => ({...exp, type: 'expense'}))
    ]

    // Sort by date (oldest to newest)
    const sortedTransactions = allTransactions.sort((a, b) =>
        new Date(a.date) - new Date(b.date)
    )

    // Extract unique sorted dates
    const uniqueDates = Array.from(new Set(
        sortedTransactions.map(t => t.date)
    )).sort((a, b) => new Date(a) - new Date(b))

    // Create formatted date labels
    const dateLabels = uniqueDates.map(date => dateFormat(date))

    // Process income and expense data based on sorted dates
    const incomeData = []
    const expenseData = []

    uniqueDates.forEach(date => {
        // Find income for this date
        const incomeForDate = incomes.find(inc => inc.date === date)
        incomeData.push(incomeForDate ? incomeForDate.amount : 0)

        // Find expense for this date
        const expenseForDate = expenses.find(exp => exp.date === date)
        expenseData.push(expenseForDate ? expenseForDate.amount : 0)
    })

    const data = {
        labels: dateLabels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(75, 192, 75, 0.6)',
                borderColor: 'green',
                tension: .2,
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'red',
                tension: .2,
                borderWidth: 2,
                fill: false
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Income & Expense Timeline'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount'
                }
            }
        }
    }

    return (
        <ChartStyled>
            <Line data={data} options={options} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    width: 100%;
`;

export default TimeChart
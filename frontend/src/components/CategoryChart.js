import React from 'react'
import {
    Chart as ChartJs,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext'

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
)

function CategoryChart({ type }) {
    const { incomes, expenses } = useGlobalContext()

    // Function to aggregate data by category
    const calculateCategoryData = (items) => {
        const categoryMap = {}

        items.forEach(item => {
            // Capitalize first letter only
            const capitalizedCategory = item.category.charAt(0).toUpperCase() + item.category.slice(1)

            if (categoryMap[capitalizedCategory]) {
                categoryMap[capitalizedCategory] += item.amount
            } else {
                categoryMap[capitalizedCategory] = item.amount
            }
        })

        return {
            categories: Object.keys(categoryMap),
            amounts: Object.values(categoryMap)
        }
    }

    // Colors for the pie chart
    const backgroundColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#8AC926', '#1982C4', '#6A4C93', '#F94144'
    ]

    // Prepare data based on type
    const items = type === 'income' ? incomes : expenses
    const { categories, amounts } = calculateCategoryData(items)

    const data = {
        labels: categories,
        datasets: [
            {
                data: amounts,
                backgroundColor: backgroundColors.slice(0, categories.length),
                borderWidth: 1
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 15
                }
            },
            title: {
                display: true,
                text: type === 'income' ? 'Income by Category' : 'Expenses by Category',
                font: {
                    size: 16
                }
            }
        },
        maintainAspectRatio: false
    }

    return (
        <ChartStyled>
            <Pie data={data} options={options} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default CategoryChart
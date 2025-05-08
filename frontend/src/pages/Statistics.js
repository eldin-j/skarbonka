import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import { InnerLayout } from '../styles/Layouts';
import TimeChart from '../components/TimeChart';
import CategoryChart from '../components/CategoryChart';

function Statistics() {
    const {totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses, incomes, expenses, formatMoney} = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <StatisticsStyled>
            <InnerLayout>
                <h1>Statistics</h1>
                <div className="time-chart-con">
                    <TimeChart />
                </div>
                <div className="category-charts-con">
                    <div className="chart">
                        <CategoryChart type="income" />
                    </div>
                    <div className="chart">
                        <CategoryChart type="expense" />
                    </div>
                </div>
                <div className="min-max-con">
                    <div className="stats-item">
                        <h2>Income <span>Min/Max</span></h2>
                        <div className="values">
                            <p>
                                ${incomes.length > 0 ? formatMoney(Math.min(...incomes.map(item => item.amount))) : 0}
                            </p>
                            <p>
                                ${incomes.length > 0 ? formatMoney(Math.max(...incomes.map(item => item.amount))) : 0}
                            </p>
                        </div>
                    </div>
                    <div className="stats-item">
                        <h2>Expense <span>Min/Max</span></h2>
                        <div className="values">
                            <p>
                                ${expenses.length > 0 ? formatMoney(Math.min(...expenses.map(item => item.amount))) : 0}
                            </p>
                            <p>
                                ${expenses.length > 0 ? formatMoney(Math.max(...expenses.map(item => item.amount))) : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </StatisticsStyled>
    )
}

const StatisticsStyled = styled.div`
    h1 {
        margin-bottom: 2rem;
    }

    .time-chart-con {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        height: 350px;
        margin-bottom: 2rem;
    }

    .category-charts-con {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-bottom: 2rem;

        .chart {
            height: 300px;
        }
    }

    .min-max-con {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;

        .stats-item {
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            padding: 1rem;
            border-radius: 20px;

            h2 {
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 1.2rem;

                span {
                    font-size: 1.5rem;
                }
            }

            .values {
                display: flex;
                justify-content: space-between;

                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Statistics
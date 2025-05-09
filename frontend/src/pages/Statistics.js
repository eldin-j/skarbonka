import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import { InnerLayout } from '../styles/Layouts';
import TimeChart from '../components/TimeChart';
import CategoryChart from '../components/CategoryChart';

function Statistics() {
    const {totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses, incomes, expenses, formatMoney, getMostFrequentCategory} = useGlobalContext()

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
                    {/* Monthly Summary */}
                    <div className="stats-item">
                        <div className="values-inline">
                            <h2>This Month's Total:</h2>
                            <p>${formatMoney(totalBalance())}</p>
                        </div>
                    </div>

                    {/* This Month's Transaction Count */}
                    <div className="stats-item">
                        <div className="values-inline">
                            <h2>This Month's Transaction Count:</h2>
                            <p>{incomes.length + expenses.length}</p>
                        </div>
                    </div>

                    {/* Income and Expense Average */}
                    <div className="stats-item">
                        <div className="values-inline">
                            <h2>Income Average:</h2>
                            <p>
                                ${incomes.length > 0
                                ? formatMoney(incomes.reduce((acc, curr) => acc + curr.amount, 0) / incomes.length)
                                : 0}
                            </p>
                        </div>
                    </div>
                    <div className="stats-item">
                        <div className="values-inline">
                            <h2>Expense Average:</h2>
                            <p>
                                ${expenses.length > 0
                                ? formatMoney(expenses.reduce((acc, curr) => acc + curr.amount, 0) / expenses.length)
                                : 0}
                            </p>
                        </div>
                    </div>

                    {/* Savings Rate (represents what percentage of the total income is not being spent.) */}
                    <div className="stats-item">
                        <div className="values-inline">
                            <h2>Savings Rate:</h2>
                            <p>
                                {(() => {
                                    const income = parseFloat(totalIncome()) || 0;
                                    const expenses = parseFloat(totalExpenses()) || 0;

                                    console.log("Debug - Income:", income, "Expenses:", expenses);

                                    if (income <= 0) return "0%";
                                    const rate = Math.round(((income - expenses) / income) * 100);
                                    return isNaN(rate) ? "0%" : `${rate}%`;
                                })()}
                            </p>
                        </div>
                    </div>

                    {/* Most Active Category */}
                    <div className="stats-item">
                        <div className="values-inline">
                            <h2>Most Used Category:</h2>
                            <p>
                                {[...incomes, ...expenses].length > 0
                                    ? getMostFrequentCategory([...incomes, ...expenses]).charAt(0).toUpperCase() +
                                    getMostFrequentCategory([...incomes, ...expenses]).slice(1)
                                    : "None"}
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

            .values-inline {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;

                h2 {
                    margin-bottom: 0;
                    font-size: 1.2rem;
                }

                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Statistics
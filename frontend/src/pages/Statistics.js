import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import History from '../components/History';
import { dollar } from '../utils/Icons';
import Chart from '../components/Chart';
import { InnerLayout } from '../styles/Layouts';

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
                <div className="Statistics-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Incomes</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="Income-title">Min <span>Incomes</span>Max</h2>
                        <div className="Income-item">
                            <p>
                                ${incomes.length > 0 ? formatMoney(Math.min(...incomes.map(item => item.amount))) : 0}
                            </p>
                            <p>
                                ${incomes.length > 0 ? formatMoney(Math.max(...incomes.map(item => item.amount))) : 0}
                            </p>
                        </div>
                        <h2 className="Income-title">Min <span>Expense</span>Max</h2>
                        <div className="Income-item">
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
        margin-bottom: 1rem;
    }
    
    .Statistics-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .Incomes-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .Incomes-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Statistics
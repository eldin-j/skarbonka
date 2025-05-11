import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import History from '../components/History';
import { dollar } from '../utils/Icons';
import { InnerLayout } from '../styles/Layouts';

function Transactions() {
    const {totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses, transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <TransactionsStyled>
            <InnerLayout>
                <h1>Transactions</h1>
                <div className="totals-con">
                    <div className="total-balance">
                        <h2>Balance</h2>
                        <p>
                            <b>₸</b> {totalBalance()}
                        </p>
                    </div>
                    <div className="total-income">
                        <h2>Income</h2>
                        <p>
                            <b>₸</b> {totalIncome()}
                        </p>
                    </div>
                    <div className="total-expense">
                        <h2>Expense</h2>
                        <p>
                            <b>₸</b> {totalExpenses()}
                        </p>
                    </div>
                </div>
                <div className="history-con">
                    <History />
                </div>
            </InnerLayout>
        </TransactionsStyled>
    )
}

const TransactionsStyled = styled.div`
    h1 {
        margin-bottom: 1rem;
    }
    
    .totals-con {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-bottom: 2rem;
        
        .total-income, .total-expense, .total-balance {
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            padding: 1rem;
            text-align: center;
            
            p {
                font-size: 2.5rem;
                font-weight: 700;
            }
        }
        
        .total-income p {
            color: var(--color-green);
        }
        .total-expense p {
            color: var(--color-red);
        }
    }
    
    .history-con {
        display: flex;
        flex-direction: column;
    }
`;

export default Transactions
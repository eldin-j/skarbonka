import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../context/globalContext';
import Button from './Button';
import { plus } from '../utils/Icons';

function TransactionForm({ type = 'income', initialValues, onSubmit, onCancel, isEditing }) {
    const {addIncome, addExpense, error, setError} = useGlobalContext()

    // Default state or use passed initialValues for editing
    const [inputState, setInputState] = useState(
        initialValues || {
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        }
    );

    const { title, amount, date, category, description } = inputState;

    // Categories based on transaction type
    const categories = type === 'income'
        ? [
            { value: "Incomes", label: "Incomes" },
            { value: "freelancing", label: "Freelancing" },
            { value: "investments", label: "Investments" },
            { value: "stocks", label: "Stocks" },
            { value: "bitcoin", label: "Bitcoin" },
            { value: "bank", label: "Bank Transfer" },
            { value: "youtube", label: "Youtube" },
            { value: "other", label: "Other" }
        ]
        : [
            { value: "education", label: "Education" },
            { value: "groceries", label: "Groceries" },
            { value: "health", label: "Health" },
            { value: "subscriptions", label: "Subscriptions" },
            { value: "takeaways", label: "Takeaways" },
            { value: "clothing", label: "Clothing" },
            { value: "travelling", label: "Travelling" },
            { value: "other", label: "Other" }
        ];

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (isEditing && onSubmit) {
            onSubmit(inputState)
        } else {
            if (type === 'income') {
                addIncome(inputState)
            } else {
                addExpense(inputState)
            }

            setInputState({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: '',
            })
        }
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Amount'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select
                    required
                    value={category}
                    name="category"
                    id="category"
                    onChange={handleInput('category')}
                >
                    <option value="" disabled>Category</option>
                    {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                </select>
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    value={description}
                    placeholder='Description'
                    id="description"
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={isEditing ? 'Update Transaction' : 'Add Transaction'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>

            {isEditing && (
                <div className="cancel-btn">
                    <Button
                        name={'Cancel'}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--color-delete)'}
                        color={'#fff'}
                        onClick={(e) => {
                            e.preventDefault();
                            onCancel && onCancel();
                        }}
                    />
                </div>
            )}
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);

        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }

    .input-control {
        input {
            width: 100%;
        }
    }

    .selects {
        display: flex;
        justify-content: flex-start;

        select {
            width: 100%;
            color: rgba(34, 34, 96, 0.4);

            &:focus, &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn, .cancel-btn {
        button {
            box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
            transition: background-color 0.3s ease;

            &:hover {
                background: var(--color-green) !important;
            }
        }
    }

    .cancel-btn button:hover {
        background: var(--color-accent) !important;
    }
`;

export default TransactionForm
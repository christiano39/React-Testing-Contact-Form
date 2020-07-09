import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import { act } from 'react-dom/test-utils'
import ContactForm from './ContactForm';

test('renders ContactForm without crashing', () => {
    render(<ContactForm />);
});

test('can fill out all inputs and submit', () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.change(firstNameInput, { target: { value: 'Edd' } });
    fireEvent.change(lastNameInput, { target: { value: 'Burke' } });
    fireEvent.change(emailInput, { target: { value: 'fake@email.com' } });
    fireEvent.change(messageInput, { target: { value: 'hello' } });

    expect(firstNameInput).toHaveValue('Edd');
    expect(lastNameInput).toHaveValue('Burke');
    expect(emailInput).toHaveValue('fake@email.com');
    expect(messageInput).toHaveValue('hello');

    const submitButton = screen.getByTestId(/submit-btn/i);
    fireEvent.click(submitButton);

    screen.findByText(/edd/i);
});
import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import ContactForm from './ContactForm';

test('renders ContactForm without crashing', () => {
    render(<ContactForm />);
});

test('can fill out all inputs and submit', async () => {
    
    render(<ContactForm />);
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByTestId(/submit-btn/i);

    
    fireEvent.change(firstNameInput, { target: { value: 'Christian' } });
    fireEvent.change(lastNameInput, { target: { value: 'Arneson' } });
    fireEvent.change(emailInput, { target: { value: 'fake@email.com' } });
    fireEvent.change(messageInput, { target: { value: 'hello' } });
    
    fireEvent.click(submitButton);

    const result = await screen.findByTestId('result');

    expect(result.textContent).toContain("Christian");
    expect(result.textContent).toContain("Arneson");
    expect(result.textContent).toContain("fake@email.com");
    expect(result.textContent).toContain("hello");
});

test('form validation works for empty required fields', async () => {

    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByTestId(/submit-btn/i);

    //click through the form without filling anything out
    fireEvent.click(firstNameInput);
    fireEvent.click(lastNameInput);
    fireEvent.click(emailInput);
    fireEvent.click(submitButton);

    const errMsgs = await screen.findAllByText(/looks like there was an error/i);
    
    expect(errMsgs[0].textContent).toContain('required');
    expect(errMsgs[1].textContent).toContain('required');
    expect(errMsgs[2].textContent).toContain('required');
})
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    test('renders the OSINT Web Application heading', () => {
        render(<App />);
        const headingElement = screen.getByText(/OSINT Web Application/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('allows the user to input a domain and select a tool', () => {
        render(<App />);

        const domainInput = screen.getByPlaceholderText('Enter domain');
        fireEvent.change(domainInput, { target: { value: 'example.com' } });
        expect(domainInput.value).toBe('example.com');

        const toolSelect = screen.getByRole('combobox');
        fireEvent.change(toolSelect, { target: { value: 'Amass' } });
        expect(toolSelect.value).toBe('Amass');
    });

    test('displays the progress bar when scanning', () => {
        render(<App />);

        const scanButton = screen.getByText('Scan');
        fireEvent.click(scanButton);

        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toBeInTheDocument();
    });
});

// Mocking the api.js service used inside TechSupportPage
jest.mock('../src/services/api.js', () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn((url) => {
        if (url.includes('/techsupportisagent')) {
          if (url.includes('test8@gmail.com')) {
            return Promise.resolve({ data: { agent: true } });
          }
          return Promise.resolve({ data: { agent: false } });
        }

        if (url.includes('/techsupportfetchuserrequests')) {
          return Promise.resolve({
            data: {
              userRequest: [{ id: 1, category: 'Bug report', status: 1, urgency: 2 }],
            },
          });
        }

        if (url.includes('/techsupport')) {
          return Promise.resolve({
            data: [
              { id: 1, category: 'Bug report', status: 1, urgency: 2, type: 1 },
              { id: 2, category: 'Other', status: 2, urgency: 3, type: 2 },
            ],
          });
        }

        if (url.includes('/gettechsupportforum')) {
          return Promise.resolve({
            data: {
              messages: [
                { name: 'Dana', content: 'Hello, how can I help you?' },
                { name: 'Alice', content: 'I have an issue.' },
              ],
            },
          });
        }

        return Promise.resolve({ data: {} });
      }),
      post: jest.fn(() => Promise.resolve({ data: {} })),
      patch: jest.fn(() => Promise.resolve({ data: {} })),
    },
  };
});

import React from 'react';
import api from '../src/services/api.js';
import { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import TechSupportPage from '../src/pages/TechSupportPage.jsx';
import { StoreContext } from '../src/store/StoreContext.jsx';

jest.mock('../src/App.css', () => ({}));

// ✅ Helper: Wrap render with act + context + router
const renderWithContext = async (user) => {
  await act(async () => {
    render(
      <StoreContext.Provider value={{ user }}>
        <BrowserRouter>
          <TechSupportPage />
        </BrowserRouter>
      </StoreContext.Provider>
    );
  });
};

describe('TechSupportPage - User', () => {
  const mockUser = { firstName: 'Alice', email: 'alice@test.com' };

  test('renders My Requests and a request entry', async () => {
    await renderWithContext(mockUser);
    expect(await screen.findByText(/My Requests/i)).toBeInTheDocument();
    expect(await screen.findByText(/Request #1/i)).toBeInTheDocument();
  });

  test('opens request popup and shows message history', async () => {
    await renderWithContext(mockUser);
    fireEvent.click(await screen.findByText(/Request #1/i));
    expect(await screen.findByText(/Hello, how can I help you/i)).toBeInTheDocument();
    expect(screen.getByText(/I have an issue/i)).toBeInTheDocument();
  });

  test('can type and send a message in the popup', async () => {
    await renderWithContext(mockUser);
    fireEvent.click(await screen.findByText(/Request #1/i));
    const textarea = await screen.findByPlaceholderText(/Write your reply here/i);
    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByText(/Send/i));
    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
    });
  });
});

describe('TechSupportPage - Agent', () => {
  const mockAgent = { firstName: 'test2', email: 'test8@gmail.com' };

  test('renders agent view with customers and leads', async () => {
    await renderWithContext(mockAgent);
    expect(await screen.findByText((content) => content.includes('Welcome agent'))).toBeInTheDocument();
    expect(await screen.findByText(/Request #1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Request #2/i)).toBeInTheDocument();
  });

  test('agent can open request and send message', async () => {
    await renderWithContext(mockAgent);
    fireEvent.click(await screen.findByText(/Request #1/i));
    expect(await screen.findByText(/Hello, how can I help you/i)).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText(/Write your reply here/i);
    fireEvent.change(textarea, { target: { value: 'Agent reply' } });
    fireEvent.click(screen.getByText(/Send/i));
    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
    });
  });

  test('agent sees warning on close if message is unsent', async () => {
    window.alert = jest.fn();
    await renderWithContext(mockAgent);
    fireEvent.click(await screen.findByText(/Request #1/i));
    const textarea = screen.getByPlaceholderText(/Write your reply here/i);
    fireEvent.change(textarea, { target: { value: 'Draft message' } });
    fireEvent.click(screen.getByText(/Mark Request as Closed/i));
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Warning/i));
  });
});

test('shows loading screen when user is null', () => {
  render(
    <StoreContext.Provider value={{ user: null }}>
      <BrowserRouter>
        <TechSupportPage />
      </BrowserRouter>
    </StoreContext.Provider>
  );
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('shows message when user has no requests', async () => {
  jest.mocked(api.get).mockImplementation((url) => {
    if (url.includes('/techsupportfetchuserrequests')) {
      return Promise.resolve({ data: { userRequest: [] } });
    }
    return Promise.resolve({ data: {} });
  });

  const mockUser = { firstName: 'Alice', email: 'alice@test.com' };
  await renderWithContext(mockUser);
  expect(await screen.findByText(/No requests yet/i)).toBeInTheDocument();
});

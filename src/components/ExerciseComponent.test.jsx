import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExerciseComponent from './ExerciseComponent';
import { MemoryRouter } from 'react-router-dom';

describe('ExerciseComponent', () => {
  it('should render the header', () => {
    render(
      <MemoryRouter>
        <ExerciseComponent />
      </MemoryRouter>
    );
    const heading = screen.getByText('Workout List');
    expect(heading).toBeInTheDocument();
  });
});
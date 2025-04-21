import { render, screen } from '@testing-library/react'
import { describe, it, expect} from 'vitest'
import ExerciseComponent from './ExerciseComponent'

describe('ExerciseComponent', () => {
  it('should render the header', () => {
    render(<ExerciseComponent />);
    const heading = screen.getByText('Workout List');
    expect(heading).toBeInTheDocument();
  });
});
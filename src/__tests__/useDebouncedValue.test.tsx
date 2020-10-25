import React, { useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

export function Example({ delay }: { delay: number }) {
    const [counter, setCounter] = useState(0);
    const debouncedState = useDebouncedValue(counter, delay);
    return <>
        <button onClick={() => { setCounter(prev => prev + 1) }}>Click</button>
        <div data-testid="counter">Count: {debouncedState}</div>
    </>;
}

describe("useDebouncedValue hook in counter example", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('renders without crashing', () => {
        render(<Example delay={0} />);
        expect(screen.queryByText("Click")).toHaveTextContent("Click");
    });

    it('does not increment value right after click', () => {
        const { getByText, getByTestId } = render(<Example delay={1000} />);
        fireEvent.click(getByText("Click"));
        expect(getByTestId("counter")).toContainHTML("Count: 0")
    });

    it('does not increment value after click before debounced time', () => {
        const { getByText, getByTestId } = render(<Example delay={1000} />);
        act(() => {
            fireEvent.click(getByText("Click"));
            jest.advanceTimersByTime(999);
        });
     
        expect(getByTestId("counter")).toContainHTML("Count: 0")
    });

    it('does increment value after click after debounced time', () => {
        const { getByText, getByTestId } = render(<Example delay={1000} />);
        act(() => {
            fireEvent.click(getByText("Click"));
            jest.advanceTimersByTime(1000);
        });

        expect(getByTestId("counter")).toContainHTML("Count: 1")
    });

    it('does not increment value after couple clicks before debounced time', () => {
        const { getByText, getByTestId } = render(<Example delay={1000} />);
        act(() => {
            fireEvent.click(getByText("Click"));
            fireEvent.click(getByText("Click"));
            fireEvent.click(getByText("Click"));
            fireEvent.click(getByText("Click"));
            fireEvent.click(getByText("Click"));
            jest.advanceTimersByTime(500);
        });

        expect(getByTestId("counter")).toContainHTML("Count: 0")
    });

    it('does increment value after couple clicks after debounced time', () => {
        const { getByText, getByTestId } = render(<Example delay={1000} />);
        act(() => {
            fireEvent.click(getByText("Click"));
            fireEvent.click(getByText("Click"));
            fireEvent.click(getByText("Click"));
            fireEvent.click(getByText("Click"));
            fireEvent.click(getByText("Click"));
            jest.advanceTimersByTime(1000);
        });

        expect(getByTestId("counter")).toContainHTML("Count: 5")
    });
});


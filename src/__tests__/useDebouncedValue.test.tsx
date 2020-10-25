import * as React from "react";
import { Example } from "./useDebouncedValueExample";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


it('renders without crashing', () => {
    const { container, getByText } = render(<Example />);
    expect(screen.queryByText("Example")).toHaveTextContent("Example");
});
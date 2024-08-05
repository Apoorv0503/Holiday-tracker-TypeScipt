import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { fetchHolidays } from "../api/holidayApi";
import "@testing-library/jest-dom";
import { Holiday } from "../types/Holiday";
import axios from "axios";

jest.mock("../api/holidayApi");

const mockHolidays = [
  { Date: "2022-01-01", "Holiday Name": "New Year's Day", Type: "Regional Holiday" }
];

describe("App basic functionalies", () => {
  it("renders the app and components", () => {
    render(<App />);
    expect(screen.getByText("Public Holiday Tracker")).toBeInTheDocument();
  });

  it("handles errors when fetching holidays", async () => {
    (fetchHolidays as jest.Mock).mockRejectedValue(new Error("Failed to fetch holidays"));

    render(<App />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "usa" } });
    const button = screen.getByRole("button", { name: /fetch holidays/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch holidays")).toBeInTheDocument();
    });
  });

  it("fetches and displays holidays successfully", async () => {
    (fetchHolidays as jest.Mock).mockResolvedValue(mockHolidays);

    render(<App />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "usa" } });
    const button = screen.getByRole("button", { name: /fetch holidays/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("New Year's Day")).toBeInTheDocument();
    });
  });
});


jest.mock("axios");

const mockHolidaysTypes: Holiday[] = [
  {
    Country: "IN",
    "Country Code": "IN",
    Day: "Saturday",
    Date: "2022-01-01",
    "Holiday Name": "New Year's Day",
    Type: "Public Holiday",
    Comments: "",
  },
  {
    Country: "IN",
    "Country Code": "IN",
    Day: "Sunday",
    Date: "2022-01-02",
    "Holiday Name": "Mannam Jayanthi",
    Type: "Public Holiday",
    Comments: "",
  },
];

/*
describe("App2", () => {
    it("fetches and displays holidays", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockHolidaysTypes });
    
        render(<App />);
    
        const button = screen.getByRole("button", { name: /fetch holidays/i });
    
        fireEvent.click(button);
    
        // Use waitFor to wait for the changes in the DOM after the API call
        await waitFor(() => {
          // Check for holidays in the document after the promise resolves
          expect(screen.getByText("New Year's Day")).toBeInTheDocument();
          expect(screen.getByText("Mannam Jayanthi")).toBeInTheDocument();
        });
      });
    
      it("displays an error message when fetching holidays fails", async () => {
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    
        render(<App />);
    
        const button = screen.getByRole("button", { name: /fetch holidays/i });
    
        fireEvent.click(button);
    
        // Wait for the error message to appear after the failed API call
        await waitFor(() => {
          expect(screen.getByText("Failed to fetch holidays")).toBeInTheDocument();
        });
      });
});

*/
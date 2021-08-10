import React from "react";

import { render, cleanup } from "@testing-library/react";

import TitleLabel from "./TitleLabel";

describe("Title Lable Component", () => {
  it("should render Hello world", () => {
    const wrapper = render(<TitleLabel text="Hello world"></TitleLabel>);
    expect(wrapper.getByText("Hello world")).toBeInTheDocument();
  });

  afterAll(cleanup);
});

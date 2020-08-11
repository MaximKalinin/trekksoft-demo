import React from "react";
import TestRenderer from "react-test-renderer";
import { Input } from "@app/components";

describe("Input component", () => {
  it("should have certain class names", () => {
    const input = TestRenderer.create(<Input className={"hello"} />);
    expect(input.root.findByType("label").props.className).toBe("hello label");
  });
  it("should be disabled while loading", () => {
    const input = TestRenderer.create(<Input loading />);
    expect(input.root.findByType("button").props.disabled).toBe(true);
  });
});

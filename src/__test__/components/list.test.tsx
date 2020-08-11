import React from "react";
import TestRenderer from "react-test-renderer";
import { List } from "@app/components";

describe("List component", () => {
  it("should match snapshot", () => {
    const list = TestRenderer.create(<List items={[]} />);
    expect(list).toMatchSnapshot();
  });
});

import React from "react";
import TestRenderer from "react-test-renderer";
import { Switch } from "@app/components";

describe("Switch component", () => {
  it("should have active option", () => {
    const fun = jest.fn(() => undefined);
    const switchEl = TestRenderer.create(
      <Switch
        options={[{ text: "hello" }, { text: "world" }]}
        activeOptionId={0}
        onActiveChange={fun}
      />
    );
    expect(
      switchEl.root.findAll(
        (instance) =>
          instance.props.className &&
          instance.props.className.match(/switch__option\b/)
      )[0].props.className
    ).toBe("switch__option switch__option--active");
  });

  it("should call function on click", () => {
    const fun = jest.fn(() => undefined);
    const switchEl = TestRenderer.create(
      <Switch
        options={[{ text: "hello" }, { text: "world" }]}
        activeOptionId={0}
        onActiveChange={fun}
      />
    );
    switchEl.root
      .findAll(
        (instance) =>
          instance.props.className &&
          instance.props.className.match(/switch__option\b/)
      )[1]
      .props.onClick();
    expect(fun).toBeCalledTimes(1);
  });
});

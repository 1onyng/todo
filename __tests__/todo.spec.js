import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoForm from "../src/App";

Enzyme.configure({ adapter: new Adapter() });

describe("TodoForm", () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = Enzyme.mount(Enzyme.shallow(<TodoForm />).get(0));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Task input", () => {
    it("Should capture task correctly onChange", () => {
      const text = wrapper.find("input").at(0);
      text.instance().value = "Test";
      text.simulate("change");
      expect(setState).toHaveBeenCalledWith("Test");
    });
  });
});

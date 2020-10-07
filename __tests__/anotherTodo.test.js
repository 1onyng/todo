import React from "react";
import { shallow } from "enzyme";
import TodoForm from "../src/App";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("TodoForm", () => {
  let wrapper;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    wrapper = shallow(<TodoForm submit={mockSubmit} />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("handleSubmit", () => {
    it("should call preventDefault", () => {
      const mockPreventDefault = jest.fn();

      const mockEvent = {
        preventDefault: mockPreventDefault
      };

      wrapper.instance().handleSubmit(mockEvent);

      expect(mockPreventDefault).toHaveBeenCalled();
    });

    it("should return if submitActive is false", () => {
      const mockPreventDefault = jest.fn();

      const mockEvent = {
        preventDefault: mockPreventDefault
      };

      const spy = jest.spyOn(wrapper.instance(), "handleSubmit");
      wrapper.instance().forceUpdate();

      wrapper.instance().handleSubmit(mockEvent);

      expect(spy).toReturn();
    });

    it("should call submit with the correct params", () => {
      wrapper.setState({
        title: "test title",
        description: "test description",
        submitActive: true
      });

      const expected = {
        title: "test title",
        description: "test description"
      };

      const mockPreventDefault = jest.fn();

      const mockEvent = {
        preventDefault: mockPreventDefault
      };

      wrapper.instance().handleSubmit(mockEvent);

      expect(mockSubmit).toHaveBeenCalledWith(expected);
    });

    it("should call handleSubmit on submit with the correct params", () => {
      const spy = jest.spyOn(wrapper.instance(), "handleSubmit");
      wrapper.instance().forceUpdate();

      const mockPreventDefault = jest.fn();

      const mockEvent = {
        preventDefault: mockPreventDefault
      };

      wrapper.find(".controlled-form").simulate("submit", mockEvent);

      expect(spy).toHaveBeenCalledWith(mockEvent);
    });
  });
});

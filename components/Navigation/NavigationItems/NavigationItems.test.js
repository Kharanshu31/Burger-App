import React from "react";

import {configure,shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationItems from "./NavigationItems"

configure({adapter:new Adapter()});

describe("NavigationItems",()=>{
  it("should render 2 elements if not authenticated",()=>{
    const wrapper=shallow(<NavigationItems />);
    wrapper.setProps({isAuthenticated:false})
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  })
  it("shouldrender 2 elements if not authenticated",()=>{
    const wrapper=shallow(<NavigationItems isAuthenticated />);
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  })
  it("shouldrender 2 elements if not authenticated",()=>{
    const wrapper=shallow(<NavigationItems />);
    expect(wrapper.contains(<NavigationItem isAuthenticated link="/logout">Logout</NavigationItem>)).toEqual(true);
  })
})

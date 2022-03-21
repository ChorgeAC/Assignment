const token = localStorage.getItem("token");

export const reducer = (state, action) => {
  if (action.type === "SHOW_MODAL") {
    if (!token) {
      alert("Login to proceed");
      return { ...state };
    }
    return { ...state, showModal: true };
  }
  if (action.type === "CLOSE_MODAL") {
    return { ...state, showModal: false };
  }
  if (action.type === "GET_MEMBERS") {
    return {
      ...state,
      showModal: false,
      members: action.payload,
      removefilter: false,
    };
  }
  if (action.type === "ADD_MEMBER") {
    const newMembers = action.payload;
    return { ...state, showModal: false, members: newMembers };
  }
  if (action.type === "REMOVE_MEMBER") {
    const newMembers = action.payload;
    return { ...state, showModal: false, members: newMembers };
  }
  if (action.type === "COMPONY_CHECK") {
    const { compony, checked } = action.payload;
    let newMembers;
    if (compony === "allChecked") {
      newMembers = state.members.map((item) => {
        return { ...item, isChecked: checked };
      });
    } else {
      newMembers = state.members.map((item) => {
        return item.compony === compony
          ? { ...item, isChecked: checked }
          : item;
      });
    }
    return { ...state, showModal: false, members: newMembers };
  }
  if (action.type === "SORT_STATUS") {
    const { checked, status } = action.payload;
    let newMembers;
    if (checked && status === "Active") {
      newMembers = state.members
        .slice(0)
        .sort((a, b) =>
          a.status > b.status ? 1 : b.status > a.status ? -1 : 0
        );
    }
    if (!checked && status === "Active") {
      return { ...state, showModal: false, removefilter: true };
    }
    if (checked && status === "Closed") {
      newMembers = state.members
        .slice(0)
        .sort((a, b) =>
          a.status > b.status ? -1 : b.status > a.status ? 1 : 0
        );
    }
    if (!checked && status === "Closed") {
      return { ...state, showModal: false, removefilter: true };
    }
    return { ...state, showModal: false, members: newMembers };
  }
};

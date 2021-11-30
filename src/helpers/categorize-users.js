const categorizeUsers = (users, filter) => {
  const categorized = { active: [], archived: [] };

  users.forEach((user) => {
    if (!user.hasOwnProperty("isActive")) return;
    if (filter && !filter(user)) return;

    if (user.isActive) {
      categorized.active.push(user);
    } else {
      categorized.archived.push(user);
    }
  });

  return categorized;
};

export default categorizeUsers;

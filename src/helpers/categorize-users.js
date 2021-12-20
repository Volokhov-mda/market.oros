import rolesConfig from "../data/rolesConfig";

const categorizeUsers = (users, filter) => {
  const categorized = { admin: [], managers: [], clients: [] };

  users.forEach((user) => {
    if (!user.hasOwnProperty("isActive")) return;
    if (filter && !filter(user)) return;

    if (user.role === rolesConfig.admin) {
      categorized.admin.push(user);
    } else if (user.role === rolesConfig.manager) {
      categorized.managers.push(user);
    } else {
      categorized.clients.push(user);
    }
  });

  return categorized;
};

export default categorizeUsers;

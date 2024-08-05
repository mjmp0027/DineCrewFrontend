const fetchUserRole = async (
  username: string,
  token: string,
): Promise<string | null> => {
  try {
    const response = await fetch(`http://10.0.2.2:8080/api/users/${username}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return userData.role;
    } else {
      console.error('Failed to fetch user role.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
};

export default fetchUserRole;

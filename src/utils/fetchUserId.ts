const fetchUserId = async (
  username: string,
  token: string,
): Promise<string | null> => {
  try {
    const response = await fetch(`http://10.0.2.2:8080/api/users/${username}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.id;
    } else {
      console.log('Failed to fetch user ID');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return null;
  }
};

export default fetchUserId;

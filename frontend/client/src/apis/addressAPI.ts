async function getAddresses() {
  try {
    const res = await fetch(`/api/user/address`, {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      return res.json();
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

export const AddressAPI = {
  getAddresses,
};

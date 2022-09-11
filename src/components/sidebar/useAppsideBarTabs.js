import {useQuery} from "react-query"
import client from "../../client"
import {config} from "../../config"
import jwt_decode from "jwt-decode";
import {QueryKeys} from "../../config/QueryKeys"

Array.prototype.sortBy = function (p) {
  return this.slice(0).sort(function (a, b) {
    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
  });
}
async function fetchTabs() {
  try {
    const token = localStorage.getItem("token")
    const decoded = jwt_decode(token);
    const response = await client.get(`${config.DYNAMIC_LINKS}/${decoded?.user[0]._id}`)
    const userDataArray = [];
    response.data.map((item, i) => {
      const userData = {
        id: item._id,
        index: item.index,
        fullName: item.mapping[0].fullName,
        pageCode: item.mapping[0].pageCode,
        text: item.mapping[0].pageName,
      };
      userDataArray.push(userData);
      return item;
    });
    return (
      Promise.resolve(userDataArray))
  } catch (err) {
    return Promise.reject(err)

  }
    
}

const useAppsideBarTabs = () => {
  return useQuery(QueryKeys.navigations, fetchTabs)
}

export {useAppsideBarTabs}
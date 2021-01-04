import AddTable from "@/components/AddTable";
import BaseMenu from "@/components/BaseMenu";
import BaseModal from "@/components/BaseModal";
import BaseTable from "@/components/BaseTable";
import BaseTableMulRow from "@/components/BaseTableMulRow";
import ContainerInput from "@/components/ContainerInput";
import ContainerInputForm from "@/components/ContainerInputForm";
import DateHourMinute from "@/components/DateHourMinute";
import FeeInput from "@/components/FeeInput";
import QueryTable from "@/components/QueryTable";
import RouterPage from "@/components/RouterPage";
import SearchOrgInput from "@/components/SearchOrgInput";
import TreeSelect from "@/components/TreeSelect";

export default {
    install(Vue) {
        Vue.component("AddTable", AddTable)
        Vue.component("BaseMenu", BaseMenu)
        Vue.component("BaseModal", BaseModal)
        Vue.component("BaseTable", BaseTable)
        Vue.component("BaseTableMulRow", BaseTableMulRow)
        Vue.component("ContainerInput", ContainerInput)
        Vue.component("ContainerInputForm", ContainerInputForm)
        Vue.component("DateHourMinute", DateHourMinute)
        Vue.component("FeeInput", FeeInput)
        Vue.component("QueryTable", QueryTable)
        Vue.component("RouterPage", RouterPage)
        Vue.component("SearchOrgInput", SearchOrgInput)
        Vue.component("TreeSelect", TreeSelect)
    }
}
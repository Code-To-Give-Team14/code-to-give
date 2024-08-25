import React from "react";
import { Card } from "antd";
import { EventTable } from "../../components/admin/EventTable";

export const AdminViewEventPage = () => {
    return (
        <Card>
            <EventTable />
        </Card>
    );
};

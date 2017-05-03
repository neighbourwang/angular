class ValuesAttr {
	attrDisplayName: string = "";
	attrValue: string = "";
}

class Values {
	REGION: ValuesAttr = new ValuesAttr;
	ZONE: ValuesAttr = new ValuesAttr;
	INSTANCETYPE: ValuesAttr = new ValuesAttr;
	INSTANCEID: ValuesAttr = new ValuesAttr;
	INSTANCENAME: ValuesAttr = new ValuesAttr;
	REMARK: ValuesAttr = new ValuesAttr;
	SERVICEOBJECTCODE: ValuesAttr = new ValuesAttr;
}

export {
	ValuesAttr,
	Values
}
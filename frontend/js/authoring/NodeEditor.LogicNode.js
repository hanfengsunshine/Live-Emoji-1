function AndNode()
{
	let that = this;
	that.addInput('', 'trigger');
	that.addInput('', 'trigger');
	that.addOutput('',"trigger");
}

AndNode.prototype.onExecute = function()
{
	if(this.getInputData(0, false)==LiteGraph.EVENT && this.getInputData(1, false)==LiteGraph.EVENT){
		this.setOutputData(0, LiteGraph.EVENT);
	}
	else{
		this.setOutputData(0, "");
	}
}

AndNode.title = "AND";
AndNode.color = "#31baff";
AndNode.shape = LiteGraph.ROUND_SHAPE;

LiteGraph.registerNodeType("node_editor/and", AndNode );

function OrNode()
{
	let that = this;
	that.addInput('', 'trigger');
	that.addInput('', 'trigger');
	that.addOutput('',"trigger");
}

OrNode.prototype.onExecute = function()
{
	if(this.getInputData(0, false)==LiteGraph.EVENT || this.getInputData(1, false)==LiteGraph.EVENT){
		this.setOutputData(0, LiteGraph.EVENT);
	}
	else{
		this.setOutputData(0, "");
	}
}

OrNode.title = "OR";
OrNode.color = "#31baff";
OrNode.shape = LiteGraph.ROUND_SHAPE;

LiteGraph.registerNodeType("node_editor/or", OrNode );











class FakeGraph:
    def invoke(self, data):
        text = data["input"]

        return {
            "output": f"AI Suggestion: Follow up discussion about '{text}'"
        }

app_graph = FakeGraph()
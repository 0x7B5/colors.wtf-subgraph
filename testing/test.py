import json
import requests

query_str = input("Enter Query: ").strip()

# query = """query {
#   	tokens {
#     	id
#     	rgb
# 	    name
#   	}
#   }
# """

query = """
{
  colorSearch(text:"%s")
  {
    id
    rgb
    name
  }
}

""" % (query_str)

url = 'https://api.thegraph.com/subgraphs/name/0x7b5/colors'
r = requests.post(url, json={'query': query})

print(json.dumps(r.json(), indent=2))

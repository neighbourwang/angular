export const SourceListMock = {
  "resultCode": "100",
  "detailDescription": null,
  "resultContent": [
    {
      "id": "PMImage000001",
      "imageName": "北京一区镜像池",
      "imageURL": "http://101.21.23.22/images",
      "pmPools": "资源池1， 资源池2， 资源池3",
      "description": "XXXXXXX",
      "status": 1
    },
    {
      "id": "PMImage000002",
      "imageName": "合肥二区镜像池",
      "imageURL": "http://101.21.23.11/images",
      "pmPools": "资源池1， 资源池2， 资源池3",
      "description": "XXXXXXX",
      "status": 0
    }
  ],
  "pageInfo": {
    "currentPage": 1,
    "totalPage": 1,
    "pageSize": 11,
    "totalRecords": 2
  }
}

export const PhyImageMock = {
    
}

export const ChangeStatusMock = {
  "resultCode": "100",
  "detailDescription": null
}

export const AlloListMock={
  "resultCode": "100",
  "detailDescription": null,
  "resultContent": {
    "inUsedPools": [
      {
        "pmPoolId": "POOLID0000003",
        "pmPoolName": "资源池3"
      },
      {
        "pmPoolId": "POOLID0000004",
        "pmPoolName": "资源池4"
      }
    ],
    "noUsedPools": [
      {
        "pmPoolId": "POOLID0000001",
        "pmPoolName": "资源池1"
      },
      {
        "pmPoolId": "POOLID0000002",
        "pmPoolName": "资源池2"
      }
    ]
  }
}
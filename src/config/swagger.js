require('dotenv').config();

module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'ALLFILM',
    description: 'Book films and manage your cinema REST API with Swagger doc',
    contact: {
      email: 'anhnguyenhoang321@gmail.com'
    }
  },
  host: `${process.env.APP_HOST}:${process.env.APP_PORT}`,
  basePath: '/api/v1',
  tags: [
    {
      name: 'Auth',
      description: 'API cho xác thực'
    },
    {
      name: 'User',
      description: 'API cho tương tác với tài khoản'
    },
    {
      name: 'Film',
      description: 'API cho phép lấy về thông tin phim'
    },
    {
      name: 'Actor',
      description: 'API cho phép lấy về thông tin diễn viên'
    },
    {
      name: 'Director',
      description: 'API cho phép lấy về thông tin đạo diễn'
    },
    {
      name: 'Session',
      description: 'API cho phép lấy về thông tin của suất chiếu'
    },
    {
      name: 'Booking',
      description: 'API cho phép đặt vé'
    }
  ],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      description: 'JWT authorization of an API',
      name: 'Authorization',
      in: 'header'
    }
  },
  schemes: [
    'http'
  ],
  paths: {
    '/auth/login': {
      post: {
        tags: [
          'Auth'
        ],
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        description: 'Login to system',
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              properties: {
                username: {
                  type: 'string'
                },
                password: {
                  type: 'string'
                }
              }
            }
          }
        ],
        responses: {}
      }
    },
    '/auth/register': {
      post: {
        tags: [
          'Auth'
        ],
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        description: 'Register to become a member of system',
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              properties: {
                username: {
                  type: 'string'
                },
                password: {
                  type: 'string'
                },
                name: {
                  type: 'string'
                },
                fullname: {
                  type: 'string'
                },
                email: {
                  type: 'string'
                },
                phone: {
                  type: 'string'
                }
              }
            }
          }
        ],
        responses: {}
      }
    },
    '/user/profile': {
      get: {
        tags: [
          'User'
        ],
        description: 'API lấy thông tin tài khoản của người dùng',
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        security: [
          {
            Bearer: []
          }
        ],
        responses: {}
      },
      put: {
        tags: [
          'User'
        ],
        description: 'API cập nhật thông tin tài khoản của người dùng',
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              properties: {
                name: {
                  type: 'string'
                },
                fullname: {
                  type: 'string'
                },
                phone: {
                  type: 'string'
                },
                email: {
                  type: 'string'
                }
              }
            }
          }
        ],
        security: [
          {
            Bearer: []
          }
        ],
        responses: {}
      }
    },
    '/user/profile/password': {
      put: {
        tags: [
          'User'
        ],
        description: 'API cập nhật mật khẩu của người dùng',
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              properties: {
                currentPassword: {
                  type: 'string'
                },
                newPassword: {
                  type: 'string'
                },
                confirmPassword: {
                  type: 'string'
                }
              }
            }
          }
        ],
        security: [
          {
            Bearer: []
          }
        ],
        responses: {}
      }
    },
    '/user/profile/booking': {
      get: {
        tags: [
          'User'
        ],
        description: 'API thống kê giao dịch của người dùng',
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'query',
            name: 'fromDate',
            required: true,
            schema: {
              type: 'date'
            }
          },
          {
            in: 'query',
            name: 'toDate',
            required: true,
            schema: {
              type: 'date'
            }
          }
        ],
        security: [
          {
            Bearer: []
          }
        ],
        responses: {}
      }
    },
    '/film': {
      get: {
        tags: [
          'Film'
        ],
        description: 'API liệt kê phim theo, sắp xếp theo ngày ra mắt',
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'query',
            name: 'q',
            description: 'Tên phim, tiếng việt hoặc tiếng anh',
            type: 'string',
            default: ''
          },
          {
            in: 'query',
            name: 'limit',
            description: 'Lấy ra bao nhiêu phim',
            type: 'integer',
            default: 6
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Lấy ra từ phim thứ mấy',
            type: 'integer',
            default: 1
          }
        ],
        responses: {}
      }
    },
    '/film/{id}': {
      get: {
        tags: [
          'Film'
        ],
        description: 'API liệt kê phim theo, sắp xếp theo ngày ra mắt',
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Id của phim cần cần lấy thông tin',
            type: 'integer'
          }
        ],
        responses: {}
      }
    },
    '/film/{id}/rating/{point}': {
      post: {
        tags: [
          'Film'
        ],
        description: 'API đánh giá phim',
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        security: [{
          Bearer: []
        }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Id của phim cần cần đánh giá',
            type: 'integer'
          },
          {
            in: 'path',
            name: 'point',
            description: 'Số điểm người dùng đánh giá phim 0-10',
            type: 'integer'
          }
        ],
        responses: {}
      }
    },
    '/director/{id}': {
      get: {
        tags: [
          'Director'
        ],
        description: 'API lấy thông tin đạo diễn theo id',
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            type: 'integer'
          }
        ],
        responses: {}
      }
    },
    '/actor/{id}': {
      get: {
        tags: [
          'Actor'
        ],
        description: 'API lấy thông tin diễn viên theo id',
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            type: 'integer'
          }
        ],
        responses: {}
      }
    },
    '/session': {
      get: {
        tags: [
          'Session'
        ],
        description: 'API liệt kê xuất chiếu theo rạp, theo phim, và ngày chiếu',
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'query',
            name: 'cinemaId',
            description: 'Id rạp phim',
            type: 'integer'
          },
          {
            in: 'query',
            name: 'filmId',
            description: 'Id phim',
            type: 'integer',
            required: true
          },
          {
            in: 'query',
            name: 'date',
            description: 'Ngày xem phim',
            type: 'date'
          }
        ],
        responses: {
          200: {
            description: 'Trả về thông tin Rạp chiếu, bao gồm các xuất chiếu'
          }
        }
      }
    },
    '/session/{id}': {
      get: {
        tags: [
          'Session'
        ],
        description: 'API lấy thông tin của suất chiếu theo id',
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            type: 'integer',
            description: 'id của suất chiếu'
          }
        ],
        responses: {}
      }
    },
    '/booking': {
      post: {
        tags: [
          'Booking'
        ],
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        description: 'API đặt vé',
        security: [{
          Bearer: []
        }],
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              properties: {
                bookingTime: {
                  type: 'string',
                  description: 'Thời gian bắt đầu đặt vé, định dạng 2021-05-08 14:00:00'
                },
                keepingTime: {
                  type: 'string',
                  description: 'Thời gian vé hết hạn, định dạng 2021-05-08 14:15:00'
                },
                seats: {
                  type: 'string',
                  description: 'Ghế sẽ đặt, định dạng C-1,C-2,C-3'
                },
                fee: {
                  type: 'integer',
                  description: 'Số tiền phải trả'
                },
                sessionId: {
                  type: 'integer',
                  description: 'Id của suất chiếu'
                },
                sessionRoomId: {
                  type: 'integer',
                  description: 'Id của phòng chiếu'
                },
                foodDrinks: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                        description: 'Id đồ ăn hoặc nước uống'
                      },
                      count: {
                        type: 'integer',
                        description: 'Số lượng đồ ăn hoặc nước uống'
                      }
                    }
                  }
                }
              }
            }
          }
        ],
        responses: {}
      }
    },
    '/booking/checkout/{id}': {
      post: {
        tags: [
          'Booking'
        ],
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        description: 'API lấy vé',
        security: [{
          Bearer: []
        }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'integer',
            description: 'Id của vé cần checkout'
          }
        ],
        responses: {}
      }
    },
    '/booking/{id}/close': {
      get: {
        tags: [
          'Booking'
        ],
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        description: 'API sử dụng vé',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'integer',
            description: 'Id của vé cần sử dụng'
          }
        ],
        responses: {}
      }
    },
    '/food-drink': {
      get: {
        tags: [
          'Food Drink'
        ],
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        description: 'API liệt kê đồ ăn thức uống',
        responses: {}
      }
    },
    '/cinema': {
      get: {
        tags: [
          'Cinema'
        ],
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        description: 'API liệt kê rạp phim',
        responses: {}
      }
    },
    '/promotion': {
      get: {
        tags: [
          'Promotion'
        ],
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        description: 'API liệt kê ưu đãi',
        responses: {}
      },
      post: {
        tags: [
          'Promotion'
        ],
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        description: 'API đăng ký nhận ưu đãi qua mail',
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              properties: {
                email: {
                  type: 'string',
                  description: 'Email nhận thông tin khuyến mãi'
                }
              }
            }
          }
        ],
        responses: {}
      }
    },
    '/promotion/{id}': {
      get: {
        tags: [
          'Promotion'
        ],
        produces: [
          'application/json'
        ],
        consumes: [
          'application/json'
        ],
        description: 'API xem thông tin ưu đãi',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string',
            description: 'Id của ưu đãi'
          }
        ],
        responses: {}
      }
    }
  },
  definitions: {
    User: {
      properties: {
        id: {
          type: 'integer',
          unique: true
        },
        username: {
          type: 'string'
        },
        passwordHash: {
          type: 'string',
          description: 'Mật khẩu đã đc hash. Mật khẩu thô phải bao gồm ít nhất 1 kí tự HOA, một kí tự thường, 1 kí tự đặc biệt, 1 kí tự số, tối thiểu 8 kí tự'
        },
        name: {
          type: 'string'
        },
        registerVerifyingToken: {
          type: 'string',
          description: 'Chuỗi khóa để kích hoạt tài khoản khi đăng ký, sau khi kích hoạt sẽ null'
        },
        phone: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        fullname: {
          type: 'string'
        }
      }
    },
    Role: {
      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string'
        },
        permition: {
          type: 'string',
          enum: [
            'r',
            'w'
          ]
        },
        entity: {
          type: 'string',
          enum: [
            'user',
            'film',
            'schedule',
            'food_drink',
            'promotion'
          ]
        }
      }
    },
    Film: {
      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string',
          description: 'Tên tiếng anh của phim'
        },
        subName: {
          type: 'string',
          description: 'Tên tiếng việt của phim'
        },
        publishDate: {
          type: 'date',
          description: 'Ngày khởi chiếu tại rạp'
        },
        duration: {
          type: 'intger',
          description: 'Thời lượng phim, tính theo phút'
        },
        trailer: {
          type: 'string'
        },
        poster: {
          type: 'string'
        },
        nation: {
          type: 'string'
        },
        description: {
          type: 'string',
          description: 'Mô tả về phim'
        },
        rating: {
          type: 'double',
          description: 'Điểm thang 10'
        },
        rating_turn: {
          type: 'integer',
          description: 'Lượt đánh giá phim'
        },
        directorId: {
          type: 'integer'
        }
      }
    },
    Director: {
      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string'
        },
        dateOfBirth: {
          type: 'date'
        },
        images: {
          type: 'string',
          description: 'Link tới các ảnh, ngăn cách bởi dấu ,'
        },
        nation: {
          type: 'string'
        }
      }
    },
    Actor: {
      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string'
        },
        dateOfBirth: {
          type: 'date'
        },
        images: {
          type: 'string',
          description: 'Link tới các ảnh, ngăn cách bởi dấu ,'
        },
        nation: {
          type: 'string'
        }
      }
    },
    Session: {
      properties: {
        id: {
          type: 'integer'
        },
        date: {
          type: 'date',
          description: 'Suất chiếu thuộc ngày nào'
        },
        startTime: {
          type: 'date-time',
          description: 'Giờ bắt đầu xuất chiếu'
        },
        endTime: {
          type: 'date-time',
          description: 'Giờ kết thúc xuất chiếu'
        },
        price: {
          type: 'integer',
          description: 'Giá vé tại xuất chiếu'
        },
        emptySeats: {
          type: 'string',
          description: 'Ghế còn trống tại suất chiếu đó'
        },
        bookedSeats: {
          type: 'string',
          description: 'Ghê đã đặt tại suất chiếu đó'
        },
        roomId: {
          type: 'integer',
          description: 'Id của phòng chiếu mà suất chiếu đó sử dụng'
        },
        filmId: {
          type: 'integer',
          description: 'Id của phim mà suất chiếu đó sẽ chiếu'
        }
      }
    },
    Promotion: {
      properties: {
        id: {
          type: 'string'
        },
        image: {
          type: 'string'
        },
        content: {
          type: 'string'
        }
      }
    },
    PromotionSubscription: {
      properties: {
        id: {
          type: 'integer'
        },
        email: {
          type: 'string'
        }
      }
    },
  }
};

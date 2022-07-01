/* eslint-disable max-len */
const Constants = module.exports;

Constants.PAGINATION = Object.freeze({
  DEFAULT_LIMIT: 25,
  DEFAULT_OFFSET: 0
});

Constants.GRANT_TYPE = Object.freeze({
  CLIENT_CREDENTIAL: 'client_credentials',
  PASSWORD: 'password',
  REFRESH_TOKEN: 'refresh_token',
  SNS: 'sns'
});

Constants.VALIDATE_ON = Object.freeze({
  BODY: 'body',
  QUERY: 'query',
  PARAMS: 'params'
});

Constants.ROLES = Object.freeze({
  ADMIN: 'admin',
  SELLER: 'seller',
  CLIENT: 'client'
});

Constants.REGEX = Object.freeze({
  BOTH_USERNAME_EMAIL_ABSOLUTE_STRING: /^(?:[\D][\D\d]{1,64}|[a-z.\d]+@[a-z.]+\.[a-z]{2,4})$/,
  PASSWORD: /^[A-Za-z0-9]{8,64}$/,
  USERNAME_ONLY: /^[A-Za-z0-9_\\-]{1,64}$/,
  EMAIL_ONLY: /^[^&=_'-,<>+.]([^&=_'-,<>]|\+){5,63}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
  ACTIVATION_TOKEN: /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/,
  HUMAN_NAME: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{1,128}$/,
  PHONE_NUMBER: /^0(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
});

Constants.VNPAY_ERROR_CODE = Object.freeze({
  '00': 'Giao dịch thành công',
  '01': 'Giao dịch đã tồn tại',
  '02': 'Merchant không hợp lẹ',
  '03': 'Dữ liệu gửi sang không đúng định dạng',
  '04': 'Khởi tạo GD không thành công do Website đang bị tạm khóa',
  '05': 'Giao dịch không thành công do: Quý khách nhập sai mật khẩu quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
  '07': 'Giao dịch bị nghi ngờ là giao dịch gian lận',
  '08': 'Giao dịch không thành công do: Hệ thống Ngân hàng đang bảo trì. Xin quý khách tạm thời không thực hiện giao dịch bằng thẻ/tài khoản của Ngân hàng này.',
  '09': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
  10: 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
  11: 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
  12: 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
  13: 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
  51: 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
  65: 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
  91: 'Không tìm thấy giao dịch yêu cầu',
  93: 'Số tiền hoàn trả không hợp lệ. Số tiền hoàn trả phải nhỏ hơn hoặc bằng số tiền thanh toán.',
  94: 'Giao dịch đã được gửi yêu cầu hoàn tiền trước đó. Yêu cầu này VNPAY đang xử lý',
  95: 'Giao dịch này không thành công bên VNPAY. VNPAY từ chối xử lý yêu cầu.',
  97: 'Chữ ký không hợp lệ',
  99: 'Các lỗi khác',
});

Constants.REFUND_STATUES = Object.freeze({
  REQUESTED: 'R',
  SUCCESSED: 'S',
  FAILED: 'F',
});

Constants.BOOKING_PAYMENT = Object.freeze({
  PAID: 'P',
  NOT_PAID: 'O',
  REQUESTED_REFUND: 'R',
  RESOVLED_REFUND: 'S'
});

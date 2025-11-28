# FeelClick - Trải nghiệm lướt web một tay

[English](README.md) | [日本語](README_JA.md)

> **Phiên bản**: 0.1.0 Beta

FeelClick là một tiện ích mở rộng (extension) cho trình duyệt Chrome, được thiết kế để hỗ trợ người dùng lướt web dễ dàng chỉ với một tay hoặc khi con lăn chuột bị hỏng. Với "Vùng cuộn" (Scroll Zone) thông minh, bạn có thể thực hiện các thao tác cuộn trang mượt mà thông qua các cú click chuột đơn giản.

## 🌟 Tính năng nổi bật

- **Scroll Zone (Vùng cuộn)**: Một lớp phủ trong suốt, có thể di chuyển và đặt ở bất kỳ đâu trên màn hình.
- **5 Chế độ cuộn linh hoạt**: Tùy chỉnh thao tác chuột trái/phải để phù hợp với thói quen của bạn.
- **Kéo thả & Khóa vị trí**: Dễ dàng di chuyển vùng cuộn đến vị trí thuận tiện và khóa lại để tránh thao tác nhầm.
- **Giao diện hiện đại**: Thiết kế Glassmorphism tinh tế, không gây cản trở tầm nhìn.
- **Lưu cấu hình**: Tự động ghi nhớ vị trí và chế độ cài đặt của bạn.

## 🎮 Các chế độ điều khiển

Extension cung cấp 5 chế độ điều khiển khác nhau, có thể thay đổi nhanh qua Popup:

1.  **Mode 1 (Mặc định)**:
    - Chuột trái: Cuộn Lên
    - Chuột phải: Cuộn Xuống
2.  **Mode 2**:
    - Chuột trái: Cuộn Xuống
    - Chuột phải: Cuộn Lên
3.  **Mode 3 (Chia đôi Trái/Phải)**:
    - Click nửa bên Trái vùng cuộn: Cuộn Lên
    - Click nửa bên Phải vùng cuộn: Cuộn Xuống
4.  **Mode 4 (Chia đôi Trên/Dưới)**:
    - Click nửa bên Trên vùng cuộn: Cuộn Lên
    - Click nửa bên Dưới vùng cuộn: Cuộn Xuống
5.  **Mode 5 (Cuộn liên tục)**:
    - Giữ chuột trái: Trượt dần xuống
    - Giữ chuột phải: Trượt dần lên

## 🚀 Hướng dẫn cài đặt

1.  Tải xuống mã nguồn của FeelClick (hoặc Clone repository này).
2.  Mở trình duyệt Chrome và truy cập địa chỉ: `chrome://extensions/`
3.  Bật chế độ **Developer mode** (Chế độ dành cho nhà phát triển) ở góc trên bên phải.
4.  Nhấn vào nút **Load unpacked** (Tải tiện ích đã giải nén).
5.  Chọn thư mục chứa mã nguồn FeelClick (thư mục chứa file `manifest.json`).
6.  Extension đã sẵn sàng sử dụng!

## 💡 Hướng dẫn sử dụng

1.  Sau khi cài đặt, biểu tượng FeelClick sẽ xuất hiện trên thanh công cụ.
2.  Mở một trang web bất kỳ (hoặc tải lại trang hiện tại).
3.  Bạn sẽ thấy một hộp thoại mờ (Scroll Zone) xuất hiện (mặc định ở góc phải).
4.  **Di chuyển**: Nhấn giữ chuột trái vào vùng cuộn và kéo để thay đổi vị trí.
5.  **Khóa/Mở khóa**: Nhấn vào biểu tượng ổ khóa nhỏ trên vùng cuộn để cố định vị trí.
6.  **Đổi chế độ**: Nhấn vào icon extension trên thanh công cụ để mở Menu cài đặt và chọn chế độ mong muốn.

## 📂 Cấu trúc thư mục

- `manifest.json`: File cấu hình chính của extension.
- `popup.html`, `popup.css`, `popup.js`: Giao diện và logic của cửa sổ cài đặt.
- `content.js`, `content.css`: Script và giao diện của Scroll Zone được nhúng vào trang web.
- `icons/`: Thư mục chứa icon của ứng dụng.

---
*Được phát triển với ❤️ để mang lại trải nghiệm lướt web tiện lợi hơn.*

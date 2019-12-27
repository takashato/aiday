import {Alert} from 'react-native';

export function handleUpdateUserInfoResult(msg) {
    if (msg.error) {
        Alert.alert('Lỗi', msg.error);
        return;
    }
    Alert.alert('Cập nhật thành công', 'Thông tin tài khoản được cập nhật thành công.')
}

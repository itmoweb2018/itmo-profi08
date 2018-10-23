<!--
/**
 * Created by PhpStorm.
 * User: Nilov Mikhail
 * Email: OTV5125@gmail.com
 * Date: 20.10.2018
 * Time: 22:55
 */
-->
<script src="js/header.js"></script>
<div class="header">
    <div class="header_button">
        <a href="javascript:void(0)" onclick="model_f('registration', 'input')" class="button_register"/>Регистрация</a>
        <a href="javascript:void(0)" onclick="model_f('input', 'registration')" class="button_input"/>Вход</a>
    </div>
</div>

<div class="modal_forms">
    <div id="registration">
        <a href="javascript:void(0)" onclick="model_f('registration', 'input')"><img src="images/close_modal.png"
                                                                                     width="25" height="25"
                                                                                     alt="Закрыть окно"></a>
        <p>Форма регистрации для студентов ИТМО(WEB 2018)</p>
        <p><input type="text" name="first_name" placeholder="Фамилия"><br>
            <input type="text" name="second_name" placeholder="Имя"><br>
            <input type="text" name="email" placeholder="email"><br>
            <input type="password" name="password" placeholder="пароль"><br>
            <input type="text" name="code" placeholder="Code"><br></p>
        <p><input type="submit"></p>
        </form>
    </div>

    <div id="input" style="display:none;">
        <a href="javascript:void(0)" onclick="model_f('input', 'registration')"><img src="images/close_modal.png"
                                                                                     width="25" height="25"
                                                                                     alt="Закрыть окно"></a>
        <p>Вход для студентов ИТМО(WEB 2018)</p>
        <p><input type="text" name="email" placeholder="email"><br>
            <input type="password" name="password" placeholder="пароль"><br></p>
        <p><input type="submit"></p>
        </form>
    </div>
</div>


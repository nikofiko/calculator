import React, { useEffect, useState } from 'react';

const Buttons = ({ onDisplayChange }) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState([]);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  useEffect(() => {
    onDisplayChange(display);
  }, [display, onDisplayChange]);

  const handleNumber = (number) => {
    if (waitingForOperand || display === '0') {
      setDisplay(number);
      setWaitingForOperand(false);
    } else {
      setDisplay(display + number);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (operator) => {
    const currentNumber = parseFloat(display);
    setExpression([...expression, currentNumber, operator]);
    setDisplay('0');
    setWaitingForOperand(true);
  };

  const solve = (expr) => {
    const expression = [...expr];
    
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === '×' || expression[i] === '÷') {
        const a = expression[i - 1];
        const b = expression[i + 1];
        if (expression[i] === '÷' && b === 0) {
          return "You can't divide by zero!";
        }
        const result = expression[i] === '×' ? a * b : a / b;
        expression.splice(i - 1, 3, result);
        i -= 2;
      }
    }
    
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === '+' || expression[i] === '-') {
        const a = expression[i - 1];
        const b = expression[i + 1];
        const result = expression[i] === '+' ? a + b : a - b;
        expression.splice(i - 1, 3, result);
        i -= 2;
      }
    }
    
    return expression[0];
  };

  const handleCalculate = () => {
    try {
      if (isNaN(parseFloat(display)) || !isFinite(display)) {
        setDisplay('Error: Invalid input');
        setExpression([]);
        setWaitingForOperand(false);
        return;
      }
  
      const currentNumber = parseFloat(display);
      const fullExpression = [...expression, currentNumber];
      const result = solve(fullExpression);
  
      if (typeof result === 'string') {
        setDisplay(result); 
        setExpression([]);
        setWaitingForOperand(false);
      } else if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error: Invalid operation');
        setExpression([]);
        setWaitingForOperand(false);
      } else {
        setDisplay(String(result));
        setExpression([]);
        setWaitingForOperand(false);
        onDisplayChange(String(result));
      }
    } catch (error) {
      setDisplay('Error');
      setExpression([]);
      setWaitingForOperand(false);
    }
  };

  const handleReset = () => {
    setDisplay('0');         
    setExpression([]);           
    setWaitingForOperand(false);  
    onDisplayChange('0');        
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));  
    } else {
      setDisplay('0');                
    }
  };

  return (
    <div className='flex justify-center pt-[24px]'>
        <div className='min-w-[327px] lg:min-w-[540px] bg-screenbg light:bg-lighttogglebg purple:bg-purpletogglebg rounded-[10px] p-[24px] lg:p-[32px]'>


            <div className='lg:text-[40px] text-[32px] font-lea font-bold text-graysihblue light:text-grayishyellow purple:text-yellow pb-[24px] grid grid-cols-4 gap-[13px] lg:gap-6 '>
                <div onClick={() => handleNumber('7')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>7</button>
                </div>
                <div onClick={() => handleNumber('8')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>8</button>
                </div>
                <div onClick={() => handleNumber('9')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>9</button>
                </div>
                <div onClick={handleDelete} className='hover:bg-[#a2b2e1] cursor-pointer text-white text-[20px] lg:text-[28px] shadow-customblue rounded-[10px] max-w-[101px] min-h-[62px] flex pt-1 justify-center bg-darkbluebg light:bg-lightbluekeybg light:shadow-lightcustomblue light:hover:bg-[#62b5bc] purple:bg-darkviolet purple:hover:bg-[#8631af] purple:shadow-purplecustomblue'>
                    <button className='cursor-pointer'>DEL</button>
                </div>
                <div onClick={() => handleNumber('4')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>4</button>
                </div>
                <div onClick={() => handleNumber('5')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>5</button>
                </div>
                <div onClick={() => handleNumber('6')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center  light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>6</button>
                </div>
                <div onClick={() => handleOperator('+')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] min-h-[62px] flex pt-1 justify-center light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>+</button>
                </div>
                <div onClick={() => handleNumber('1')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>1</button>
                </div>
                <div onClick={() => handleNumber('2')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center  light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>2</button>
                </div>
                <div onClick={() => handleNumber('3')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center  light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>3</button>
                </div>
                <div onClick={() => handleOperator('-')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] min-h-[62px] flex pt-1 justify-center  light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>-</button>
                </div>
                <div onClick={handleDecimal} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center  light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>.</button>
                </div>
                <div onClick={() => handleNumber('0')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>0</button>
                </div>
                <div onClick={() => handleOperator('÷')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] max-h-[62px] flex pt-1 justify-center light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>/</button>
                </div>
                <div onClick={() => handleOperator('×')} className='hover:bg-white cursor-pointer shadow-customwhite bg-orangekeybg rounded-[10px] max-w-[101px] min-h-[62px] flex pt-1 justify-center light:bg-lightkeybg light:shadow-lightcustomwhite purple:bg-violetkey purple:shadow-purplecustomwhite purple:hover:bg-[#6c34ac]'>
                    <button className='cursor-pointer'>x</button>
                </div>
            </div>


            <div className='flex text-[20px] lg:text-[28px] font-lea font-bold text-white gap-[13px] lg:gap-[24px]'>
                <div onClick={handleReset} className='hover:bg-[#a2b2e1] cursor-pointer shadow-customblue rounded-[10px] min-w-[133px] lg:min-w-[227px] min-h-[64px] bg-darkbluebg flex justify-center light:bg-lightbluekeybg light:shadow-lightcustomblue light:hover:bg-[#62b5bc] purple:bg-darkviolet purple:hover:bg-[#8631af] purple:shadow-purplecustomblue'>
                    <button className='cursor-pointer'>RESET</button>
                </div>
                <div onClick={handleCalculate} className='hover:bg-[#F96B5B] cursor-pointer shadow-customred rounded-[10px] min-w-[133px] lg:min-w-[227px] min-h-[64px] bg-redtog flex justify-center light:bg-lightredkeybg light:hover:bg-[#ff8a38] purple:bg-purecyan purple:shadow-purplecustomred purple:hover:bg-purecyan purple:text-black'>
                    <button className='cursor-pointer'>=</button>
                </div>
            </div>
            
        </div>
    </div>
    
  )
}

export default Buttons

package com.epam.indigoeln.core.chemistry.experiment.common.units;

import com.epam.indigoeln.core.chemistry.experiment.common.GenericCode;

/**
 *
 *
 *
 */
public class Unit extends GenericCode implements Comparable {

    private static final long serialVersionUID = -1688969122894961308L;

    private static final int HASH_PRIME = 19471;
    private static int nextOrdinal = 0;
    private final int ordinal;
    private UnitType type;
    private String displayValue = "";
    private String stdCode = "--";
    private double stdConversionFactor = -1;
    private int stdDisplayFigs = 3;

    private Unit(String code) {
        super();
        setCode(code);
        this.ordinal = nextOrdinal++;
    }

    Unit(String code, UnitType type, String displayValue, String description, String stdCode, double stdConversionFactor,
         int stdDisplayFigs) {
        super();
        this.code = code;
        this.type = type;
        this.displayValue = displayValue;
        this.description = description;
        this.stdCode = stdCode;
        this.stdConversionFactor = stdConversionFactor;
        this.stdDisplayFigs = stdDisplayFigs;
        this.ordinal = nextOrdinal++;
    }

    /**
     * This is a kludge because of the necessity to set a single value upon load from storage. This needs to be revisited when
     * load/save happen in an easier manner.
     *
     * @param code The code to set - entire unit is rebuilt from UnitCache.getUnit(code)
     */
    private void setCode(String code) {
        deepCopy(UnitCache.getInstance().getUnit(code));
    }

    /**
     * @return Returns the displayValue.
     */
    String getDisplayValue() {
        return displayValue;
    }

    public UnitType getType() {
        return type;
    }

    @Override
    public int compareTo(Object o) {
        int comp = this.hashCode() - o.hashCode();
        if (o instanceof Unit) {
            comp = this.type.compareTo(((Unit) o).getType());
            if (comp == 0)
                comp = this.ordinal - ((Unit) o).ordinal;
        }
        return comp;
    }

    @Override
    public String toString() {
        return this.displayValue;
    }

    @Override
    public int hashCode() {
        return (HASH_PRIME + ordinal * HASH_PRIME) + this.type.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if ((obj == null) || getClass() != obj.getClass()) {
            return false;
        }
        Unit test = (Unit) obj;
        return (type.equals(test.type) && code.equals(test.code));
    }

    @Override
    public void deepCopy(Object source) {
        if (source instanceof Unit) {
            Unit src = (Unit) source;
            super.deepCopy(source);
            type = src.type;
            displayValue = src.displayValue;
            stdCode = src.stdCode;
            stdConversionFactor = src.stdConversionFactor;
            stdDisplayFigs = src.stdDisplayFigs;
        }
    }

    @Override
    public Object deepClone() {
        return new Unit(getCode());
    }

}
